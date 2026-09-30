import React, { createContext, useContext, useState } from 'react'

const IntakeContext = createContext(null)

export function IntakeProvider({ children }) {
  const [reportData, setReportData] = useState({
    scamType: '',
    platform: '',
    amount: '',
    currency: 'ETB',
    senderAccount: '',
    destinationAccount: '',
    destinationBank: '',
    narrative: '',
    contactPhone: '',
    contactEmail: '',
    evidenceFiles: [],
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [submittedCaseRef, setSubmittedCaseRef] = useState(null)

  const updateReport = (fields) => {
    setReportData((prev) => ({ ...prev, ...fields }))
  }

  const submitReport = () => {
    const caseRef = `ETH-2026-${Math.floor(1000 + Math.random() * 9000)}`
    setSubmittedCaseRef(caseRef)
    setCurrentStep(4) // Final confirmation step
    return caseRef
  }

  const resetForm = () => {
    setReportData({
      scamType: '',
      platform: '',
      amount: '',
      currency: 'ETB',
      senderAccount: '',
      destinationAccount: '',
      destinationBank: '',
      narrative: '',
      contactPhone: '',
      contactEmail: '',
      evidenceFiles: [],
    })
    setCurrentStep(1)
    setSubmittedCaseRef(null)
  }

  return (
    <IntakeContext.Provider
      value={{
        reportData,
        updateReport,
        currentStep,
        setCurrentStep,
        submitReport,
        submittedCaseRef,
        resetForm,
      }}
    >
      {children}
    </IntakeContext.Provider>
  )
}

export function useIntake() {
  const context = useContext(IntakeContext)
  if (!context) {
    throw new Error('useIntake must be used within IntakeProvider')
  }
  return context
}
