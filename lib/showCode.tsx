import React, {Fragment,useState} from 'react'
import Highlight, {defaultProps} from "prism-react-renderer";

interface IProps {
    code: string
}

const ShowCode: React.FunctionComponent<IProps> = (props) => {

    const [codeVisible, setVisible] = useState(false)
    const trigger = () => {
        setVisible(!codeVisible)
    }

    return (
        <Fragment>
            <div>
                {props.children}
            </div>
            <button className={'showCode'} onClick={trigger}>代码展示</button>

            {codeVisible&&(
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
            )}
        </Fragment>
    )
}

ShowCode.displayName = 'ShowCode'

export default ShowCode