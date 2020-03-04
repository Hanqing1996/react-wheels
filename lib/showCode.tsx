import React from 'react'
import Highlight, {defaultProps} from "prism-react-renderer";

interface IProps {
    code: string
}

const ShowCode: React.FunctionComponent<IProps> = (props) => {
    return (
        <div>
            <div>
                {props.children}
            </div>
            <Highlight {...defaultProps} code={props.code} language="jsx">
                {({className, style, tokens, getLineProps, getTokenProps}) => (
                    <pre className={className} style={style}>
              {tokens.map((line, i) => (
                  <div {...getLineProps({line, key: i})}>
                      {line.map((token, key) => (
                          <span {...getTokenProps({token, key})} />
                      ))}
                  </div>
              ))}
            </pre>
                )}
            </Highlight>
        </div>
    )
}

ShowCode.displayName = 'ShowCode'

export default ShowCode