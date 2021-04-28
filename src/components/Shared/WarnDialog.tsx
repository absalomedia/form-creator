/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import {
  Button,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialog,
} from '@chakra-ui/react'

interface Props {
  close: () => Promise<void>
}

const WarnDialog = React.memo<Props>(({ close }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const cancelRef = React.useRef<any>()

  const onClose = async () => {
    await close()
    setIsOpen(false)
  }

  return (
    <>
      <Button colorScheme="red" onClick={() => setIsOpen(true)}>
        Delete form
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Form
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You cannot undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
})

WarnDialog.displayName = 'Warn dialog'

export default WarnDialog
