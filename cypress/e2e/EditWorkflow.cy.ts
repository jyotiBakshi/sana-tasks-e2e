import * as workflowFlows from '../support/flows/workflows'
import { WorkflowData } from '../support/types/workflow.types'
import { WorkflowEditData } from '../support/types/workflow.types'

describe('Edit Workflow', () => {
  // This test focuses on intent (open → edit → save → verify).
  // Detailed selectors/clicks live in workflowFlows.
  const WORKFLOW_PATH = '/workflows#tasks=%22my-tasks%22'

  let editData: WorkflowEditData
  let createData: WorkflowData

  before(() => {
    // Load fixtures for both creating and editing.
    // Edit test creates a workflow first, then edits it.
    cy.fixture('create-workflow').then((data) => {
      createData = data
    })

    cy.fixture('edit-workflow').then((data) => {
      editData = data
    })
  })

  beforeEach(() => {
    // Navigate to the Workflows page and close any blocking dialog.
    workflowFlows.gotoWorkflows(WORKFLOW_PATH)
  })

  it('should edit existing workflow from daily dinner to weekly meal planner', () => {
    const { trigger, steps, inputs } = createData

    const workflowName = editData.existing.name
    const workflowDescription = editData.existing.description

    const existingTriggerFrequency = editData.existing.trigger?.frequency ?? trigger.frequency

    // Create the workflow first so the test does not depend on pre-existing data.
    workflowFlows.openCreateWorkflowModal()
    workflowFlows.configureRecurringSchedule(trigger)

    workflowFlows.addStep(steps.step1)
    workflowFlows.addTextInputs(inputs)

    workflowFlows.addStep(steps.step2)
    workflowFlows.verifySearchWebEnabledInSources()

    workflowFlows.saveNewWorkflow(workflowName, workflowDescription)
    workflowFlows.assertWorkflowVisible(workflowName)

    // Now edit the workflow we just created.
    workflowFlows.openProcessEditor()

    // Update the trigger schedule.
    workflowFlows.updateTriggerFromExistingFrequency({
      existingFrequencyLabel: existingTriggerFrequency,
      newFrequency: editData.updates.trigger.frequency,
      time: editData.updates.trigger.time,
      displayTime: editData.updates.trigger.displayTime,
    })

    // Update step 2 instructions and verify the saved content.
    workflowFlows.updateStep2Instructions(editData.updates.steps.step2)
    workflowFlows.saveWorkflow()
    workflowFlows.assertStep2Instructions(editData.updates.steps.step2)

    // Cleanup after test run.
    workflowFlows.deleteWorkflow()
  })
})
