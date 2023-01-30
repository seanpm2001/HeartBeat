import React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import Typography from '@mui/material/Typography'
import { NextButton, BackButton, ExportButton, MetricsStepperBody, MetricsStepLabel } from './style'
import { useAppDispatch, useAppSelector } from '@src/hooks'
import { backStep, nextStep, selectStep } from '@src/features/stepper/StepperSlice'

const steps = ['Config', 'Metrics', 'Export']
const MetricsStepper = () => {
  const dispatch = useAppDispatch()
  const activeStep = useAppSelector(selectStep)

  const handleNext = () => {
    dispatch(nextStep())
  }

  const handleBack = () => {
    dispatch(backStep())
  }

  return (
    <Box>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          return (
            <Step key={label}>
              <MetricsStepLabel>{label}</MetricsStepLabel>
            </Step>
          )
        })}
      </Stepper>
      <MetricsStepperBody>
        <Typography>Step {activeStep + 1}</Typography>
        <Box>
          <BackButton onClick={handleBack}>Back</BackButton>
          {activeStep === steps.length - 1 ? (
            <ExportButton> Export board data</ExportButton>
          ) : (
            <NextButton onClick={handleNext}>Next</NextButton>
          )}
        </Box>
      </MetricsStepperBody>
    </Box>
  )
}

export default MetricsStepper