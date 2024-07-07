
Feature: Test Example
    This is a test example


Scenario: First
    When Usuario accede al buscador de Google
    And Busca 'Playwright' en el buscador
    And Accede al primer resultado
    Then El primer resultado es el sitio oficial de Playwright