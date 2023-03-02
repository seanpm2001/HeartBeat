export const PROJECT_NAME = 'Heartbeat'
export const PROJECT_DESCRIPTION =
  'Heartbeat is a tool for tracking project delivery metrics that can help you get a better understanding of delivery performance. This product allows you easily get all aspects of source data faster and more accurate to analyze team delivery performance which enables delivery teams and team leaders focusing on driving continuous improvement and enhancing team productivity and efficiency.'

export const ZERO = 0

export const REGULAR_CALENDAR = 'Regular Calendar(Weekend Considered)'

export const CHINA_CALENDAR = 'Calendar with Chinese Holiday'

export const NEXT = 'Next'

export const BACK = 'Back'

export const EXPORT_BOARD_DATA = 'Export board data'

export const STEPS = ['Config', 'Metrics', 'Export']

export const REQUIRED_DATA_LIST = [
  'Velocity',
  'Cycle time',
  'Classification',
  'Lead time for changes',
  'Deployment frequency',
  'Change failure rate',
  'Mean time to recovery',
]
export const VELOCITY = 'Velocity'
export const LEAD_TIME_FOR_CHANGES = 'Lead time for changes'
export const REQUIRED_DATA = 'Required Data'
export const TEST_PROJECT_NAME = 'test project Name'
export const ERROR_MESSAGE_COLOR = 'color: #d32f2f'
export const ERROR_DATE = '02/03/'
export const PAST_DATE = '08/02/2022'

export const BOARD_TYPES = {
  CLASSIC_JIRA: 'Classic Jira',
  JIRA: 'Jira',
  LINEAR: 'Linear',
}

export const PIPELINE_TOOL_TYPES = {
  BUILD_KITE: 'BuildKite',
  GO_CD: 'GoCD',
}

export const SOURCE_CONTROL_TYPES = {
  GIT_HUB: 'Github',
}

export enum CONFIG_TITLE {
  BOARD = 'Board',
  PIPELINE_TOOL = 'PipelineTool',
  SOURCE_CONTROL = 'SourceControl',
}

export const BOARD_FIELDS = ['board', 'boardId', 'email', 'projectKey', 'site', 'token']
export const PIPELINE_TOOL_FIELDS = ['pipelineTool', 'token']
export const SOURCE_CONTROL_FIELDS = ['sourceControl', 'token']
export const MOCK_URL = '/api/v1/kanban/verify'
export const JIRA_VERIFY_FAILED_MESSAGE = 'Jira verify failed'
