/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'

const inputTypes = [
  { fieldType: 'text', description: 'Short text input' },
  { fieldType: 'checkbox', description: 'Many options select' },
  { fieldType: 'date', description: 'Date picker' },
  { fieldType: 'email', description: 'Email input' },
  { fieldType: 'number', description: 'Number picker' },
  { fieldType: 'radio', description: 'Select single option select' },
  { fieldType: 'textarea', description: 'Long text input' },
]

const InputsDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button colorScheme="facebook" onClick={onOpen} size="lg">
        Click to add input
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Add the input:</DrawerHeader>
            <DrawerBody></DrawerBody>
            <DrawerFooter>
              <Button colorScheme="facebook" onClick={onClose} size="lg">
                Close
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default InputsDrawer
