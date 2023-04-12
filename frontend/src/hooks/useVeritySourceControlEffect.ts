import { useState } from 'react'
import { sourceControlClient } from '@src/clients/SourceControlClient'
import { ERROR_MESSAGE_TIME_DURATION, VERIFY_FAILED_ERROR_MESSAGE } from '@src/constants'
import { VerifySourceControlReq } from '@src/models/request/sourceControlReq'

export interface useVerifySourceControlStateInterface {
  verifyGithub: (params: VerifySourceControlReq) => Promise<
    | {
        isSourceControlVerify: boolean
        response: object
      }
    | undefined
  >
  isLoading: boolean
  errorMessage: string
}

export const useVerifySourceControlEffect = (): useVerifySourceControlStateInterface => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const verifyGithub = async (params: VerifySourceControlReq) => {
    setIsLoading(true)
    try {
      return await sourceControlClient.getVerifySourceControl(params)
    } catch (e) {
      const err = e as Error
      setErrorMessage(`${params.type} ${VERIFY_FAILED_ERROR_MESSAGE}: ${err.message}`)
      setTimeout(() => {
        setErrorMessage('')
      }, ERROR_MESSAGE_TIME_DURATION)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    verifyGithub,
    isLoading,
    errorMessage,
  }
}
