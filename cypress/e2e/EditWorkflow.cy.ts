import * as button from '../support/functions/generics/button'
import * as findByRole from '../support/functions/generics/findByRole'
import * as findByText from '../support/functions/generics/findByText'
import * as dialog from '../support/functions/generics/dialog'
import * as input from '../support/functions/generics/input'
import * as menu from '../support/functions/generics/menu'
import * as menuButton from '../support/functions/generics/menuButton'
import * as contenteditable from '../support/functions/generics/contenteditable'
import * as section from '../support/functions/generics/section'
import { WorkflowEditData } from '../support/types/workflow.types'

describe('Edit Workflow', () => {
  const WORKFLOW_URL = 'https://sana.ai/ynFUyevTTc3U/workflows#tasks=%22my-tasks%22'
  
  let editData: WorkflowEditData
  
  before(() => {
    cy.fixture('edit-workflow').then((data) => {
      editData = data
    })
  })
  
  beforeEach(() => {
    cy.visit(WORKFLOW_URL)
    cy.wait(30000)
    // WORKAROUND: Manual wait for Gmail OTP authentication
    // TODO: Automate login process
    dialog.closeDialog()
    dialog.waitForDialogToClose()
    findByRole.click('link', { name: /^workflows$/i })
  })

  it('should edit existing workflow from daily dinner to weekly meal planner', () => {
    // Navigate to Browse tab
    findByRole.click('tab', { name: /browse/i })
    
    // Search and open workflow
    input.typeIntoPlaceholder(/search workflows/i, editData.existing.name, true)
    findByRole.clickFirst('heading', { name: editData.existing.name })
    
    // Open Process editor
    section.clickButtonInSection('Process', /edit/i)
    
    // Update trigger to weekly schedule
    button.click(/Configure trigger options/i)
    
    dialog.withinDialog(() => {
      button.click(editData.existing.trigger.frequency)
    })
    
    menu.selectMenuItem(new RegExp(editData.updates.trigger.frequency, 'i'))
    
    dialog.withinDialog(() => {
      input.clearAndTypeInTestId('task-timepicker', `${editData.updates.trigger.time}{enter}`)
      button.click("Confirm")
    })
    
    // Verify trigger updated
    findByText.verifyVisible(new RegExp(editData.updates.trigger.frequency, 'i'))
    findByText.verifyVisible(new RegExp(editData.updates.trigger.displayTime, 'i'))
    
    // Update Step 2 instructions
    contenteditable.clearAndType(1, editData.updates.steps.step2)
    
    // Save workflow
    button.click("Save workflow")
    
    // Verify Step 2 text updated
    contenteditable.verifyText(1, editData.updates.steps.step2)

    // Delete workflow
    menuButton.clickNearText('Edit info')
    menu.selectMenuItem('Delete workflow')
    button.click("Confirm")
  })



})