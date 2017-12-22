import React from 'react'
import { connect } from 'react-redux'
import { compose, pure, withStateHandlers } from 'recompose'
import * as cn from 'classnames'

import styles from './Video.scss'

const VideoInner = ({
  video, speaker, videoId, conference, isOpen, toggleIsOpen
}) => {
  const { title, length, link } = video
  return (
    <div className={styles.root} key={videoId} >
      <div className={styles.top} onClick={toggleIsOpen} >
        <a className={styles.title} href={link}>{title}</a>
        <span className={styles.right}>{length}</span>
      </div>
      <div className={cn(styles.videoWrapper, { [styles.open]: isOpen })}>
        {isOpen && <iframe
          title="videoPlayer"
          id="ytplayer"
          type="text/html"
          width="410"
          height="360"
          src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=0&origin=http://example.com"
          frameBorder="0"
        /> }
      </div>
      <div className={styles.details}>
        <span>{speaker.name}</span>
        <span>{conference.title}</span>
      </div>
    </div>
  )
}

const mapStateToProps = (state, props) => {
  const { data: { videos, presenters, conferences } } = state
  const { videoId, conferenceId } = props
  const video = videos[videoId]
  const conference = conferences[conferenceId]
  const speaker = presenters[video.presenter]
  return {
    video: videos[videoId],
    conference,
    speaker
  }
}

const Video = compose(
  connect(mapStateToProps, null),
  pure,
  withStateHandlers({ isOpen: false }, {
    toggleIsOpen: ({ isOpen }) => () => ({ isOpen: !isOpen })
  })
)(VideoInner)

export default Video
