import React, {Fragment} from 'react'
import Scroll from "../../components/scroll/scroll";

export default function () {

    const onPull=()=>{
        console.log('ok,后端知道要给新数据了')
    }

    return (
        <Fragment>
            <Scroll style={{height:300}} a={2} onPull={onPull}>
                <p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>10</p><p>11</p><p>12</p>
                <p>13</p><p>14</p><p>15</p><p>16</p><p>17</p><p>18</p><p>19</p><p>20</p>
            </Scroll>
        </Fragment>
    )
}