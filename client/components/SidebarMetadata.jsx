import React from 'react';

const GenreDisplay = (props) => {
  return (
    <a href=''>{props.genre}, </a>
  )
}

const SidebarButton = (props) => {
  return (
    <div className="sidebarButton">
      <a>{props.label}</a>
    </div>
  )
}

const SidebarMetadata = (props) => {
  return (
    <div>
      <span className='metadataLabel'>TITLE:</span> {props.product.name}<br />
      <span className='metadataLabel'>GENRE:</span> {props.product.genres.map((genre, key) => { return (<GenreDisplay genre={genre} key={key} />)})}<br />
      <span className='metadataLabel'>DEVELOPER:</span> {props.product.developer}<br />
      <span className='metadataLabel'>PUBLISHER:</span> {props.product.publisher}<br />
      <span className='metadataLabel'>RELEASE DATE:</span> {props.product.releaseDate}<br />
      <SidebarButton label='View update history' />
      <SidebarButton label='Read related news' />
      <SidebarButton label='View discussions' />
      <SidebarButton label='Find Community Groups' />
    </div>
  )
}

export default SidebarMetadata;