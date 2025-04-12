import { styled } from "styled-components"


export const FormnContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-items: center;
    gap: 0.5rem;

    color: ${props => props.theme["gray-100"]};
    font-size: 1.25rem;
    font-weight: bold;

    flex-wrap: wrap;
`

const BaseInput = styled.input`
    background-color: transparent;
    height: 2.5rem;
    border: 0;
    border-bottom: 2px solid ${props => props.theme["gray-500"]};
    font-weight: bold;
    font-size: 1.25rem;
    padding: 0 0 0.5;
    color: ${props => props.theme["gray-100"]};

    ::placeholder {
        color: ${props => props.theme["gray-500"]};
       
    }

    &:focus {
        border-color: none;
        box-shadow: none;
    }
`

export const TaskInput = styled(BaseInput)`
    flex: 1;

`

export const MinutesInput = styled(BaseInput)`
    width:4rem;

   
`