'use client'
import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/theme-solarized_light'
import 'ace-builds/src-noconflict/theme-one_dark'
import 'ace-builds/src-noconflict/ext-language_tools'
import { useTheme } from 'next-themes'

const CodeEditor = ({ code, setCode, post, setPost }) => {
  const { theme } = useTheme()
  return (
    <>
      {theme === 'light' ? (
        <AceEditor
          mode='javascript'
          theme='solarized_light'
          fontSize={16}
          editorProps={{ $blockScrolling: true }}
          height='100%'
          width='100%'
          onChange={(value) => {
            setCode(value)
            setPost({ ...post, code: value })
          }}
          value={code}
        />
      ) : (
        <AceEditor
          mode='javascript'
          theme='one_dark'
          fontSize={16}
          editorProps={{ $blockScrolling: true }}
          height='100%'
          width='100%'
          onChange={(value) => {
            setCode(value)
            setPost({ ...post, code: value })
          }}
          value={code}
        />
      )}
    </>
  )
}

export default CodeEditor
