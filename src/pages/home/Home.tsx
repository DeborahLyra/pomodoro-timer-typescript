import { Play } from "@phosphor-icons/react";
import { HomeContainer, FormnContainer, CountdownContainer, Separator, StartButton, MinutesInput, TaskInput } from "./style";


export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormnContainer>
          <label htmlFor="">Vou trabalhar em </label>
          <TaskInput type="text" id="text" placeholder="Dê um nome para seu projeto"/>

          <label htmlFor="">durante</label>
          <MinutesInput type="number" id="minutesAmmout" step={5}/>

          <span>minutos</span>
        </FormnContainer>


        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartButton type="submit">
          <Play size={24} />
          Começar
        </StartButton>
      </form>
    </HomeContainer>
  )
}
