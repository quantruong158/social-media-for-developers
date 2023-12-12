'use client'
import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/theme-solarized_light'
import 'ace-builds/src-noconflict/theme-one_dark'
import 'ace-builds/src-noconflict/ext-language_tools'
import { useTheme } from 'next-themes'

const CodeView = ({ code }) => {
  const { theme } = useTheme()
  return (
    <>
      {theme === 'light' ? (
        <AceEditor
          readOnly
          minLines={5}
          maxLines={25}
          mode='javascript'
          theme='solarized_light'
          fontSize={16}
          editorProps={{ $blockScrolling: true }}
          width='100%'
          value={code}
        />
      ) : (
        <AceEditor
          readOnly
          minLines={5}
          maxLines={25}
          mode='javascript'
          theme='one_dark'
          fontSize={16}
          editorProps={{ $blockScrolling: true }}
          width='100%'
          value={code}
        />
      )}
    </>
  )
}

export default CodeView
