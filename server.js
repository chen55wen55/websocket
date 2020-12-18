//import express �M ws �M��
const express = require('express')
const SocketServer = require('ws').Server

//���w�}�Ҫ� port
const PORT = 3000

//�Ы� express ������A�øj�w�κ�ť 3000 port �A�B�]�w�}�ҫ�b console ������
const server = express()
    .listen(PORT, () => console.log(`Listening on ${PORT}`))

//�N express �浹 SocketServer �}�� WebSocket ���A��
const wss = new SocketServer({ server })

//�� WebSocket �q�~���s���ɰ���
wss.on('connection', ws => {

    //�s���ɰ��榹 console ����
    console.log('Client connected')

	ws.on('message', data => {
		let clients = wss.clients

        //���j��A�o�e�T���ܨC�� client
        clients.forEach(client => {
            client.send(data)
        })
    })
    //�� WebSocket ���s�u�����ɰ���
    ws.on('close', () => {
        console.log('Close connected')
    })
})