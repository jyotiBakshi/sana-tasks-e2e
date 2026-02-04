export interface WorkflowData {
  name: string
  description: string
  trigger: {
    frequency: string
    time: string
    displayTime: string
  }
  steps: {
    step1: string
    step2: string
  }
  inputs: string[]
}

export interface WorkflowEditData {
  existing: {
    name: string
    description: string
    trigger?: {
      scheduleType: string
      frequency: string
      time: string
      displayTime: string
    }
  }
  updates: {
    name: string
    description: string
    trigger: {
      frequency: string
      startDay: string
      time: string
      displayTime: string
    }
    steps: {
      step1: string
      step2: string
    }
    inputs: string[]
  }
}
