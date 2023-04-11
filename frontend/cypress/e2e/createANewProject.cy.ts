import homePage from '../pages/home'
import configPage from '../pages/metrics/config'
import metricsPage from '../pages/metrics/metrics'

describe('Create a new project', () => {
  it('Should create a new project manually', () => {
    homePage.navigate()

    homePage.createANewProject()
    cy.url().should('include', '/metrics')

    configPage.typeProjectName('E2E Project')

    configPage.goHomePage()

    homePage.createANewProject()
    cy.contains('Project Name *').should('have.value', '')

    configPage.typeProjectName('E2E Project')

    configPage.selectDateRange()

    const nextButton = () => cy.get('button:contains("Next")')
    nextButton().should('be.disabled')

    configPage.selectMetricsData()

    configPage.fillBoardInfoAndVerifyWithClassicJira('1963', 'test@test.com', 'PLL', 'site', 'mockToken')

    cy.contains('Verified').should('exist')
    cy.contains('Reset').should('exist')

    configPage.fillPipelineToolFieldsInfoAndVerify('mock1234'.repeat(5))

    configPage.fillSourceControlFieldsInfoAndVerify(`ghp_${'Abc123'.repeat(6)}`)

    nextButton().should('be.enabled')

    configPage.CancelBackToHomePage()

    configPage.goMetricsStep()

    cy.contains('Crews Setting').should('exist')
    cy.contains('Real Done').should('exist')

    metricsPage.checkClassification()

    metricsPage.checkDeploymentFrequencySettings()

    nextButton().should('be.enabled')
  })
})
