import * as workflowFlows from '../support/flows/workflows'
import { WorkflowData } from '../support/types/workflow.types'

describe('Create Workflow', () => {
  // This test is intentionally high-level.
  // Detailed selectors/clicks live in workflowFlows so the spec reads like a scenario.
  const WORKFLOW_PATH = '/workflows#tasks=%22my-tasks%22'

  let workflowData: WorkflowData

  before(() => {
    // Load test data from fixture so the test stays readable.
    cy.fixture('create-workflow').then((data) => {
      workflowData = data
    })
  })

  beforeEach(() => {
    // Navigate to the Workflows page.
    // This also closes any dialog that blocks interactions.
    workflowFlows.gotoWorkflows(WORKFLOW_PATH)
  })

  it('should create new workflow for daily dinner recipe inspiration', () => {
    const { trigger, steps, inputs, name, description } = workflowData

    // Open the create-workflow modal.
    workflowFlows.openCreateWorkflowModal()

    // Configure the workflow schedule trigger.
    workflowFlows.configureRecurringSchedule(trigger)

    // Step 1: add the first step and its input variables.
    workflowFlows.addStep(steps.step1)
    workflowFlows.addTextInputs(inputs)

    // Step 2: add instructions and verify the expected default sources.
    workflowFlows.addStep(steps.step2)
    workflowFlows.verifySearchWebEnabledInSources()

    // Save the workflow and confirm it was created.
    workflowFlows.saveNewWorkflow(name, description)
    workflowFlows.assertWorkflowVisible(name)
  })
})
