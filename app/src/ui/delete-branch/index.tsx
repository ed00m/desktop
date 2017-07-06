import * as React from 'react'

import { Dispatcher } from '../../lib/dispatcher'
import { Repository } from '../../models/repository'
import { Branch } from '../../models/branch'
import { Button } from '../lib/button'
import { ButtonGroup } from '../lib/button-group'
import { Checkbox, CheckboxValue } from '../lib/checkbox'
import { Dialog, DialogContent, DialogFooter } from '../dialog'

interface IDeleteBranchProps {
  readonly dispatcher: Dispatcher
  readonly repository: Repository
  readonly branch: Branch
  readonly onDismissed: () => void
}

interface IDeleteBranchState {
  readonly includeRemoteBranch: boolean
}

export class DeleteBranch extends React.Component<
  IDeleteBranchProps,
  IDeleteBranchState
> {
  public constructor(props: IDeleteBranchProps) {
    super(props)

    this.state = {
      includeRemoteBranch: false,
    }
  }

  public render() {
    return (
      <Dialog
        id="delete-branch"
        title={__DARWIN__ ? 'Delete Branch' : 'Delete branch'}
        type="warning"
        onDismissed={this.props.onDismissed}
      >
        <DialogContent>
          <p>
            Delete branch "{this.props.branch.name}"?
          </p>
          <p>This cannot be undone.</p>
          <Checkbox
            label="Include branch on remote"
            value={
              this.state.includeRemoteBranch
                ? CheckboxValue.On
                : CheckboxValue.Off
            }
            onChange={this.onIncludeRemoteChanged}
          />
        </DialogContent>
        <DialogFooter>
          <ButtonGroup destructive={true}>
            <Button type="submit">Cancel</Button>
            <Button onClick={this.deleteBranch}>Delete</Button>
          </ButtonGroup>
        </DialogFooter>
      </Dialog>
    )
  }

  private onIncludeRemoteChanged = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const value = event.currentTarget.checked

    this.setState({ includeRemoteBranch: value })
  }

  private deleteBranch = () => {
    this.props.dispatcher.deleteBranch(
      this.props.repository,
      this.props.branch,
      this.state.includeRemoteBranch
    )
    this.props.dispatcher.closePopup()
  }
}
