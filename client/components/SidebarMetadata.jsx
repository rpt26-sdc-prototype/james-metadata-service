import React from 'react';
import css from '../styles/sidebarMetadata.css';

// const GenreDisplay = (props) => {
//   return (
//     <span>
//       <a href='' className='metadataLink'>{props.genre}</a>{props.index !== props.finalKey ? ', ' : null}
//     </span>
//   )
// }

const SidebarButton = (props) => {
  return (
    <div className="linkbar">
      {props.label}
    </div>
  )
}

const SidebarMetadata = (props) => {
  return (
    <div className='sidebarElement'>
      <span className='metadataLabel'>TITLE:</span> {props.product.name}<br />
      {/* <span className='metadataLabel'>GENRE:</span> { props.product.genres.map( (genre, key, genres) => { return (<GenreDisplay genre={genre} key={key} index={key} finalKey={genres.length - 1}/>) }) }<br /> */}
      <span className='metadataLabel'>GENRE:</span> <a href='' className='metadataLink'>{props.product.genre}</a><br />
      <span className='metadataLabel'>DEVELOPER:</span> <a href='' className='metadataLink'>{props.product.developer}</a><br />
      <span className='metadataLabel'>PUBLISHER:</span> <a href='' className='metadataLink'>{props.product.publisher}</a><br />
      <span className='metadataLabel'>RELEASE DATE:</span> {props.product.releasedate}<br />
      <SidebarButton label='View update history' />
      <SidebarButton label='Read related news' />
      <SidebarButton label='View discussions' />
      <SidebarButton label='Find Community Groups' />
    </div>
  )
}

export default SidebarMetadata;