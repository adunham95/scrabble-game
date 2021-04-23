import React from 'react';
  import {Cat,
CheckCircle,
Dog,
Dragon,
Elephant,
ExclamationCircle,
Horse,
QuestionCircle,
Squirrel,
TimesCircle,
Turtle,
Unicorn,
Whale} from './ReactIcons';

export const Icon = ({
    name = '',
    color = '#626262',
    height = 15,
    width = 15,
}) => { 
    const generateIcons = () => {
        let searchName = name.toLowerCase();
        switch (searchName) {
         case 'cat':
    return <Cat color={color} height={height} width={width} />;
case 'checkcircle':
    return <CheckCircle color={color} height={height} width={width} />;
case 'dog':
    return <Dog color={color} height={height} width={width} />;
case 'dragon':
    return <Dragon color={color} height={height} width={width} />;
case 'elephant':
    return <Elephant color={color} height={height} width={width} />;
case 'exclamationcircle':
    return <ExclamationCircle color={color} height={height} width={width} />;
case 'horse':
    return <Horse color={color} height={height} width={width} />;
case 'questioncircle':
    return <QuestionCircle color={color} height={height} width={width} />;
case 'squirrel':
    return <Squirrel color={color} height={height} width={width} />;
case 'timescircle':
    return <TimesCircle color={color} height={height} width={width} />;
case 'turtle':
    return <Turtle color={color} height={height} width={width} />;
case 'unicorn':
    return <Unicorn color={color} height={height} width={width} />;
case 'whale':
    return <Whale color={color} height={height} width={width} />; 
            default:
            return (
                <p>
                    {name}
                </p>
            ); 
        }
    };

    return (
        <div>
        {generateIcons()}
        </div>
    );
}; 
    