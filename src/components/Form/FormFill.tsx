import React, { useState } from 'react'
import { Center, Flex, Spinner } from '@chakra-ui/react'
import { useSingleForm } from '@hooks'
import EndingScreen from './EndingScreen'
import Form from './Form'
import WelcomeScreen from './WelcomeScreen'
import { ErrorInfo } from '@components'

interface Props {
  id: string
}

const FormFill = ({ id }: Props) => {
  const { form, isError, isLoading } = useSingleForm(id)
  const [step, setStep] = useState(0)

  return (
    <Flex w="100%" maxW="1200px" margin="50px auto">
      {!isLoading && !isError && (
        <>
          {step === 0 && (
            <WelcomeScreen
              title={form?.form.title}
              description={form?.form.description}
              nextStep={() => setStep(1)}
              expiration={form?.form.dateOfExpire}
            />
          )}
          {step === 1 && <Form form={form?.form} nextStep={() => setStep(2)} />}
          {step === 2 && (
            <EndingScreen
              title={form?.form.completeTitle}
              description={form?.form.completeTitle}
            />
          )}
        </>
      )}
      {isError && <ErrorInfo />}
      {isLoading && (
        <Center h="500px" w="100%">
          <Spinner size="lg" />
        </Center>
      )}
    </Flex>
  )
}

export default FormFill
