import { test, expect } from '@playwright/test';
import { api } from '../fixtures/test-data';
import { writeFileSync } from 'fs';

test.describe('Brasil API', () => {
    //Cenário #001
    test('Retorna dados do endereço com CEP válido', async ({ request }) => {
        const response = await request.get(`${api.baseURL}${api.cep}/04007001`)
        const body = await response.json();
        const formattedJson = JSON.stringify(body, null, 2);

        writeFileSync('evidences/cep-valido-response.txt', formattedJson, 'utf-8'); //salvando evidência

        expect(response.status()).toBe(200);
        expect(body.cep).toBe('04007001');
        expect(body.state).toBe('SP');
        expect(body.city).toBe('São Paulo');
        expect(body.neighborhood).toBe('Vila Mariana');
    });

    //Cenário #002
    test('Retorna erro para CEP inválido', async ({ request }) => {
        const response = await request.get(`${api.baseURL}${api.cep}/040070011`)
        const body = await response.json();
        const formattedJson = JSON.stringify(body, null, 2);

        writeFileSync('evidences/cep-invalido-response.txt', formattedJson, 'utf-8'); //salvando evidência

        expect(response.status()).toBe(400);
        expect(body.name).toBe('CepPromiseError');
        expect(body.message).toBe('CEP deve conter exatamente 8 caracteres.');
        expect(body.type).toBe('validation_error');
    });

    //Cenário #003
    test('Retorna todos os bancos', async ({ request }) => {
        const response = await request.get(`${api.baseURL}${api.bancos}`)
        const body = await response.json();
        const formattedJson = JSON.stringify(body, null, 2);

        writeFileSync('evidences/bancos-response.txt', formattedJson, 'utf-8'); //salvando evidência

        expect(response.status()).toBe(200);
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);
    });

    //Cenário #004
    test('Retorna feriados nacionais para um ano válido', async ({ request }) => {
        const response = await request.get(`${api.baseURL}${api.feriados}/2026`)
        const body = await response.json();
        const formattedJson = JSON.stringify(body, null, 2);

        writeFileSync('evidences/feriados-valido-response.txt', formattedJson, 'utf-8'); //salvando evidência
        
        expect(response.status()).toBe(200);
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);
    });

    //Cenário #005
    test('Retorna erro ao buscar feriados nacionais para um ano inválido', async ({ request }) => {
        const response = await request.get(`${api.baseURL}${api.feriados}/2200`)
        const body = await response.json();
        const formattedJson = JSON.stringify(body, null, 2);

        writeFileSync('evidences/feriados-invalido-response.txt', formattedJson, 'utf-8'); //salvando evidência
        
        expect(response.status()).toBe(404);
        expect(body.name).toBe('NotFoundError');
        expect(body.message).toBe('Ano fora do intervalo suportado entre 1900 e 2199.');
        expect(body.type).toBe('feriados_range_error');
    });
});