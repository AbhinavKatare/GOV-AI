const express = require('express');
const https = require('https');
const http = require('http');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

const NVIDIA_BASE_URL = process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1';
const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY || '';
const MODEL = 'meta/llama-3.3-70b-instruct';

/* ── System prompt ────────────────────────────────────────── */
const SYSTEM_PROMPT = `You are govAI Assistant — an expert AI helper embedded in the Indian Government Citizen Portal. 
Your job is to help Indian citizens with:
- Finding and applying for government schemes (PMAY, PM-KUSUM, Stand-Up India, etc.)
- Understanding eligibility criteria for benefits
- Tracking job openings in government departments
- Explaining government policies and regulations in simple language
- Helping citizens with document requirements and application processes

Always be helpful, concise, and accurate. When mentioning schemes, include key details like 
benefit amounts and deadlines. If you're unsure, say so and direct users to official sources.
Respond in the same language the user writes in (English or Hindi).`;

/* ── POST /api/chat ── */
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({ success: false, message: 'messages array is required' });
        }

        if (!NVIDIA_API_KEY) {
            return res.status(500).json({ success: false, message: 'NVIDIA API key not configured' });
        }

        // Build payload for NVIDIA NIM (OpenAI-compatible)
        const payload = JSON.stringify({
            model: MODEL,
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                ...messages,
            ],
            temperature: 0.6,
            top_p: 0.95,
            max_tokens: 1024,
            stream: false,
        });

        // Parse URL
        const url = new URL(`${NVIDIA_BASE_URL}/chat/completions`);
        const lib = url.protocol === 'https:' ? https : http;

        const options = {
            hostname: url.hostname,
            port: url.port || (url.protocol === 'https:' ? 443 : 80),
            path: url.pathname + url.search,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${NVIDIA_API_KEY}`,
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload),
            },
        };

        // Make request
        const data = await new Promise((resolve, reject) => {
            const req = lib.request(options, (nRes) => {
                let body = '';
                nRes.on('data', chunk => body += chunk);
                nRes.on('end', () => {
                    try { resolve({ status: nRes.statusCode, body: JSON.parse(body) }); }
                    catch { reject(new Error('Invalid JSON response from NVIDIA')); }
                });
            });
            req.on('error', reject);
            req.write(payload);
            req.end();
        });

        if (data.status !== 200) {
            console.error('NVIDIA API error:', data.body);
            return res.status(data.status).json({
                success: false,
                message: data.body?.error?.message || 'NVIDIA API error',
            });
        }

        const choice = data.body?.choices?.[0];
        if (!choice) {
            return res.status(500).json({ success: false, message: 'No response from model' });
        }

        res.json({
            success: true,
            message: choice.message?.content || '',
            usage: data.body.usage,
        });

    } catch (error) {
        console.error('Chat route error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error in chat route',
        });
    }
});

module.exports = router;
