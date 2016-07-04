import React from 'react'
import ReactMarkdown from 'react-markdown'

const MarkdownPage = ({ content }) => {
  return <div>HELLO</div>
//  return (
//    <ReactMarkdown source={Test} escapeHtml={true} />
//  )
}

MarkdownPage.propTypes = {
  content: React.PropTypes.string
}

export default MarkdownPage
