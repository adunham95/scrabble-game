import React, { useState } from 'react'
import { Icon } from '../../components/Icons/Icon';

const avatars = ['cat','dog','dragon','elephant','horse','squirrel','turtle','unicorn','whale'];
const colors = [
    {name: "Red", color: '#f44336'},
    {name: "Pink", color: '#e91e63'},
    {name: "Purple", color: '#673ab7'},
    {name: "Blue", color: '#2196f3'},
    {name: "Green", color: '#009688'},
    {name: "Lime", color: '#cddc39'},
    {name: "Yellow", color: '#ffeb3b'},
    {name: "Amber", color: '#ffc107'},
    {name: "Orange", color: '#FF8201'},
    {name: "Smoke", color: '#58595C'}
]

const Index = () => {

    const [selectedAvatar, setSelectedAvatar] = useState("dog")
    const [selectedColor, setSelectedColor] = useState({name: "Smoke", color: "#58595C"})

    return (
        <div>
            <div>
                <Icon
                    name={selectedAvatar}
                    color={selectedColor.color}
                    height={100}
                    width={100}
                />
            </div>
            <div>
                {
                    avatars.map(a => <button onClick={()=>setSelectedAvatar(a)}>
                        <Icon name={a}/>
                    </button>)
                }
            </div>
            <div>
                {
                    colors.map(c => <button onClick={()=>setSelectedColor(c)} style={{backgroundColor:c.color}}>{c.name}</button>)
                }
            </div>
        </div>
    )
}

export default Index
