import { FormnContainer, MinutesInput, TaskInput } from "./style";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../context/CyclesContext";


export function NewCycleForm() {

  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormnContainer>
      <label htmlFor="">Vou trabalhar em </label>
      <TaskInput
        id="text"
        placeholder="Dê um nome para seu projeto"
        list='task-suggestions'
        {...register("task")}
        disabled={!!activeCycle}
      />

      <label htmlFor="">durante</label>
      <MinutesInput
        type="number"
        id="minutesAmount"
        step={1}
        min={1}
        max={60}
        placeholder="00"
        {...register("minutesAmount", { valueAsNumber: true })} //fazer com que seja armazenado um número
        disabled={!!activeCycle}
      />

      <span>minutos</span>
    </FormnContainer>
  )
}
