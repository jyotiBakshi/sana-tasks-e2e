import * as button from '../support/functions/generics/button'
import * as link from '../support/functions/generics/link'
import * as switchHelper from '../support/functions/generics/switch'
import * as findByRole from '../support/functions/generics/findByRole'
import * as findByText from '../support/functions/generics/findByText'
import * as dialog from '../support/functions/generics/dialog'
import * as input from '../support/functions/generics/input'
import * as menu from '../support/functions/generics/menu'
import * as placeholder from '../support/functions/generics/placeholder'
import { WorkflowData } from '../support/types/workflow.types'

describe('Create Workflow', () => {
  const WORKFLOW_URL = 'https://sana.ai/ynFUyevTTc3U/workflows#tasks=%22my-tasks%22'
  
  let workflowData: WorkflowData
  
  before(() => {
    cy.fixture('create-workflow').then((data) => {
      workflowData = data
    })
  })
  
  beforeEach(() => {
    cy.visit(WORKFLOW_URL)
    cy.wait(30000)
    // WORKAROUND: Manual wait for Gmail OTP authentication
    // jyoti.bakshy@gmail.com
    
    dialog.closeDialog()
    dialog.waitForDialogToClose()
    findByRole.click('link', { name: /^workflows$/i })
  })

  it('should create new workflow for daily dinner recipe inspiration', () => {
    // Open create workflow modal
    link.click(/^workflows$/i)
    button.click(/create workflow/i)

    // Verify modal opened
    findByText.verifyVisible('New workflow')
    
    // Configure daily weekday trigger at 6pm
    findByText.click(/select a trigger/i)
    findByText.click(/set a schedule/i)
    findByText.click(/recurring schedule/i)
    
    dialog.withinDialog(() => {
      button.click(/daily/i)
    })

    menu.selectMenuItem(new RegExp(workflowData.trigger.frequency, 'i'))

    dialog.withinDialog(() => {
      input.clearAndTypeInTestId('task-timepicker', `${workflowData.trigger.time}{enter}`)
      button.click("Confirm")
    })

    // Verify trigger configured
    findByText.verifyVisible(new RegExp(workflowData.trigger.frequency, 'i'))
    findByText.verifyVisible(new RegExp(workflowData.trigger.displayTime, 'i'))
 
    // Add Step 1: Dinner preferences
    button.click(/add step/i)
    input.typeIntoDataPlaceholder('What do you want to do?', workflowData.steps.step1)
    button.click("Sources")
    
    // Add text inputs
    workflowData.inputs.forEach((inputName) => {
      button.click("Input")
      findByRole.click('menuitem', { name: "Text" })
      placeholder.typeInLast(/variable name/i, `${inputName}{enter}`)
    })

    // Add Step 2: AI instructions
    button.click("Add step")
    input.typeIntoDataPlaceholder('What do you want to do?', workflowData.steps.step2)
    
    button.click("Sources")
    switchHelper.verifyEnabled("Search web")
    button.click("Sources")
    
    // Save workflow
    button.click("Save workflow")
    placeholder.clearAndType(/enter workflow name/i, workflowData.name, { timeout: 25000 })
    placeholder.clearAndType(/enter workflow description/i, workflowData.description)
    button.click("Done")
    
    // Verify workflow created
    findByRole.verifyVisible('heading', { name: workflowData.name })
  })
})