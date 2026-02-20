# Desafio Prático – Automação de Testes
Rafael Lucas Mota Gritti

rafael.gritti@ibm.com

# Ferramenta Utilizada
    - Playwright

# Como Executar os Testes
    - Baixe o projeto e o abra no VS Code
    - Clique em Terminal > New Terminal > Escolha Command Prompt
    - Execute o comando: npx playwright test
    - Aguarde a finalizar a execução dos testes
    - As evidências serão salvas na pasta evidences
    - Execute o comando: npx playwright show-report
    - Report dos testes será exibido

# Estrutura do Projeto
.github\workflows\playwright.yml --> integração CI/CD Git Actions

evidences\ --> pasta de evidências dos testes

fixtures\test-data.ts --> dados globais utilizados nos testes

tests\API.spec.ts --> teste back-end API

tests\inventory.spec.ts --> teste front-end interface

tests\login.spec.ts --> teste front-end interface

# Estratégia Adotada
    - Testes de back-end API, dos cenários #001 a #005 (vide arquivo xlsx), do site API Brasil https://brasilapi.com.br/api
    - Testes de front-end funcionais de interface, dos cenários #006 a #012 (vide arquivo xlsx), do site SauceDemo https://www.saucedemo.com/