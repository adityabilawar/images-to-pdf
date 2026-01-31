const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');

const BASE_URL = 'http://localhost:3000/api';
let TOKEN = '';

async function run() {
    try {
        console.log('--- Starting Verification ---');

        // 1. Register
        const email = `test${Date.now()}@example.com`;
        const password = 'password123';
        console.log(`1. Registering user: ${email}`);

        // Axios throws on 4xx/5xx by default
        await axios.post(`${BASE_URL}/auth/register`, { email, password });

        // 2. Login
        console.log('2. Logging in...');
        const loginRes = await axios.post(`${BASE_URL}/auth/login`, { email, password });
        TOKEN = loginRes.data.token;
        if (!TOKEN) throw new Error('Login failed: No token');
        console.log('   Logged in successfully.');

        // 3. Create Folder
        console.log('3. Creating Folder "Documents"...');
        const folderRes = await axios.post(`${BASE_URL}/files/folder`,
            { name: 'Documents' },
            { headers: { 'Authorization': `Bearer ${TOKEN}` } }
        );
        const folderData = folderRes.data;
        console.log('   Folder created:', folderData.name, folderData.id);

        // 4. Upload File
        console.log('4. Uploading File into folder...');
        const dummyPath = path.join(__dirname, 'dummy_test.txt');
        fs.writeFileSync(dummyPath, 'Hello World Content');

        const formData = new FormData();
        formData.append('file', fs.createReadStream(dummyPath));
        formData.append('parentId', folderData.id);

        const uploadRes = await axios.post(`${BASE_URL}/files/upload`, formData, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                ...formData.getHeaders()
            }
        });
        const fileData = uploadRes.data;
        console.log('   File uploaded:', fileData.name);

        // 5. List Files
        console.log('5. Listing files in folder...');
        const listRes = await axios.get(`${BASE_URL}/files`, {
            params: { parentId: folderData.id },
            headers: { 'Authorization': `Bearer ${TOKEN}` }
        });
        const listData = listRes.data;
        console.log(`   Found ${listData.length} items.`);
        if (listData.length !== 1) throw new Error('Expected 1 file in folder');

        console.log('--- Verification PASSED ---');
    } catch (error) {
        console.error('--- Verification FAILED ---', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
    }
}

run();
