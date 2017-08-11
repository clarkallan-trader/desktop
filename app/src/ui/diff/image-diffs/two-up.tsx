import * as React from 'react'
import { renderImage } from './render-image'
import { ICommonImageDiffProperties } from './modified-image-diff'
import { IImageSize } from './sizing'

/**
 * The height of the Deleted/Added labels at the top and the image dimension
 * labels.
 */
const ControlsHeight = 60

const XPadding = 20

interface ITwoUpProps extends ICommonImageDiffProperties {
  readonly containerWidth: number

  readonly previousImageSize: IImageSize | null
  readonly currentImageSize: IImageSize | null
}

export class TwoUp extends React.Component<ITwoUpProps, {}> {
  public render() {
    const style: React.CSSProperties = {
      maxWidth: Math.min(
        (this.props.containerWidth - XPadding) / 2,
        this.props.maxSize.width
      ),
      maxHeight: this.props.maxSize.height - ControlsHeight,
    }

    const zeroSize = { width: 0, height: 0 }
    const previousImageSize = this.props.previousImageSize || zeroSize
    const currentImageSize = this.props.currentImageSize || zeroSize

    return (
      <div className="image-diff_inner--two-up" ref={this.props.onContainerRef}>
        <div className="image-diff__before">
          <div className="image-diff__header">Deleted</div>
          {renderImage(this.props.previous, {
            onLoad: this.onPreviousImageLoad,
            style,
          })}

          <div className="image-diff__footer">
            <span className="strong">W:</span> {previousImageSize.width}px |{' '}
            <span className="strong">H:</span> {previousImageSize.height}px
          </div>
        </div>

        <div className="image-diff__after">
          <div className="image-diff__header">Added</div>
          {renderImage(this.props.current, {
            onLoad: this.onCurrentImageLoad,
            style,
          })}

          <div className="image-diff__footer">
            <span className="strong">W:</span> {currentImageSize.width}px |{' '}
            <span className="strong">H:</span> {currentImageSize.height}px
          </div>
        </div>
      </div>
    )
  }

  private onPreviousImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    this.props.onPreviousImageLoad(e.currentTarget)
  }

  private onCurrentImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    this.props.onCurrentImageLoad(e.currentTarget)
  }
}
