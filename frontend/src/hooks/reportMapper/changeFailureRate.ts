import { ReportDataWithThreeColumns } from '@src/hooks/reportMapper/reportUIDataStructure'
import { ChangeFailureRateResponse } from '@src/clients/report/dto/response'
import { FAILURE_RATE_NAME } from '@src/constants'

export const changeFailureRateMapper = ({
  avgChangeFailureRate,
  changeFailureRateOfPipelines,
}: ChangeFailureRateResponse) => {
  const mappedChangeFailureRateValue: ReportDataWithThreeColumns[] = []

  changeFailureRateOfPipelines.map((item, index) => {
    const deploymentFrequencyValue: ReportDataWithThreeColumns = {
      id: index,
      name: `${item.name}/${item.step}`,
      valuesList: [{ name: FAILURE_RATE_NAME, value: item.failureRate }],
    }
    mappedChangeFailureRateValue.push(deploymentFrequencyValue)
  })
  mappedChangeFailureRateValue.push({
    id: mappedChangeFailureRateValue.length,
    name: `${avgChangeFailureRate.name}/`,
    valuesList: [{ name: FAILURE_RATE_NAME, value: avgChangeFailureRate.failureRate }],
  })

  return mappedChangeFailureRateValue
}
