import React from 'react'
import ReactMarkdown from 'react-markdown'
var Test = require('../static/test.txt')

const MarkdownPage = ({ content }) => {
  console.log(Test)
  return (
    <ReactMarkdown source={Test} escapeHtml={true} />
  )
}

MarkdownPage.propTypes = {
  content: React.PropTypes.string
}

export default MarkdownPage
