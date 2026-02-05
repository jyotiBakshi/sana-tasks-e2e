import * as button from '../functions/generics/button'
import * as contenteditable from '../functions/generics/contenteditable'
import * as dialog from '../functions/generics/dialog'
import * as findByRole from '../functions/generics/findByRole'
import * as findByText from '../functions/generics/findByText'
import * as input from '../functions/generics/input'
import * as link from '../functions/generics/link'
import * as menu from '../functions/generics/menu'
import * as menuButton from '../functions/generics/menuButton'
import * as placeholder from '../functions/generics/placeholder'
import * as section from '../functions/generics/section'
import * as switchHelper from '../functions/generics/switch'

// Shared UI flows for workflow tests.
// Keep selectors here so spec files stay easy to read.

// Go to workflows page and close any blocking dialog.
// Includes a temporary wait for manual OTP authentication.
export function gotoWorkflows(workflowPath: string) {
  cy.visit(workflowPath)

  // Wait up to 30s for the auth/login dialog, then close it.
  dialog.closeDialog({ timeout: 30000, closeButtonName: /close/i })
  dialog.waitForDialogToClose()
  findByRole.click('link', { name: /^workflows$/i })
}

// Open the "Create workflow" modal.
export function openCreateWorkflowModal() {
  link.click(/^workflows$/i)
  button.click(/create workflow/i)
  findByText.verifyVisible('New workflow')
}

// Configure a recurring schedule trigger and verify it is shown.
// Frequency and displayTime are asserted so we know the UI saved the trigger.
export function configureRecurringSchedule(trigger: {
  frequency: string
  time: string
  displayTime: string
}) {
  findByText.click(/select a trigger/i)
  findByText.click(/set a schedule/i)
  findByText.click(/recurring schedule/i)

  dialog.withinDialog(() => {
    button.click(/daily/i)
  })

  menu.selectMenuItem(new RegExp(trigger.frequency, 'i'))

  dialog.withinDialog(() => {
    input.clearAndTypeInTestId('task-timepicker', `${trigger.time}{enter}`)
    button.click('Confirm')
  })

  findByText.verifyVisible(new RegExp(trigger.frequency, 'i'))
  findByText.verifyVisible(new RegExp(trigger.displayTime, 'i'))
}

// Add one step with the given text.
export function addStep(stepText: string) {
  button.click(/add step/i)
  input.typeIntoDataPlaceholder('What do you want to do?', stepText)
}

// Add text inputs (variables) in Sources.
// Each variable becomes one "Text" input in the workflow.
export function addTextInputs(variableNames: string[]) {
  button.click('Sources')

  variableNames.forEach((variableName) => {
    button.click('Input')
    findByRole.click('menuitem', { name: 'Text' })
    placeholder.typeInLast(/variable name/i, `${variableName}{enter}`)
  })
}

// Check "Search web" is enabled in Sources and close Sources.
export function verifySearchWebEnabledInSources() {
  button.click('Sources')
  switchHelper.verifyEnabled('Search web')
  button.click('Sources')
}

// Save a newly created workflow.
export function saveNewWorkflow(name: string, description: string) {
  button.click('Save workflow')
  placeholder.clearAndType(/enter workflow name/i, name, { timeout: 25000 })
  placeholder.clearAndType(/enter workflow description/i, description)
  button.click('Done')
}

// Assert the workflow heading is visible.
// Used as a simple smoke check after creating/saving.
export function assertWorkflowVisible(name: string) {
  findByRole.verifyVisible('heading', { name })
}

// Open the Process editor.
export function openProcessEditor() {
  section.clickButtonInSection('Process', /edit/i)
}

// Update trigger frequency and time, then verify it.
export function updateTriggerFromExistingFrequency(args: {
  existingFrequencyLabel: string
  newFrequency: string
  time: string
  displayTime: string
}) {
  button.click(/Configure trigger options/i)

  dialog.withinDialog(() => {
    button.click(args.existingFrequencyLabel)
  })

  menu.selectMenuItem(new RegExp(args.newFrequency, 'i'))

  dialog.withinDialog(() => {
    input.clearAndTypeInTestId('task-timepicker', `${args.time}{enter}`)
    button.click('Confirm')
  })

  findByText.verifyVisible(new RegExp(args.newFrequency, 'i'))
  findByText.verifyVisible(new RegExp(args.displayTime, 'i'))
}

// Update step 2 instructions (2nd contenteditable).
export function updateStep2Instructions(text: string) {
  contenteditable.clearAndType(1, text)
}

// Save the workflow.
export function saveWorkflow() {
  button.click('Save workflow')
}

// Assert step 2 instructions match.
export function assertStep2Instructions(text: string) {
  contenteditable.verifyText(1, text)
}

// Delete the workflow.
export function deleteWorkflow() {
  menuButton.clickNearText('Edit info')
  menu.selectMenuItem('Delete workflow')
  button.click('Confirm')
}
