@Get
Feature: Api

  Scenario: Get api
    When Call GET to "/"
    Then the response status code should be "200"
    And the response should be:
      | version           | name            | hostname | started_at                                      |
      | /^\d+\.\d+\.\d+$/ | service-backend | /^.*$/   | /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/ |
