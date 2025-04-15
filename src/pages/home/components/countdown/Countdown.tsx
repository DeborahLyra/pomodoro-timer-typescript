import { useContext, useEffect } from "react";
import { CountdownContainer, Separator } from "./style";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../context/CyclesContext";



export function Countdown() {

    const { activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondPassed } = useContext(CyclesContext)

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0 //transformar para segungos o tempo

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0 //calcular quantos segundos se passaram
    const minutesAmount = Math.floor(currentSeconds / 60) //calcular os minutos dentro dos segundos 
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, '0') //incluit o 0 no inicio
    const seconds = String(secondsAmount).padStart(2, '0') //incluit o 0 no inicio

    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutes}:${seconds}`
        }
    }, [minutes, seconds, activeCycle])


    useEffect(() => {
        let interval: number;

        if (activeCycle) {
            interval = setInterval(() => {
                const differenceSeconds = differenceInSeconds(new Date, activeCycle.startDate)

                if (differenceSeconds >= totalSeconds) {
                    markCurrentCycleAsFinished()

                    setSecondPassed(totalSeconds)
                    clearInterval(interval)
                } else {
                    setSecondPassed(differenceSeconds)
                }


            }, 1000)
        }

        return () => {
            clearInterval(interval)    // <-- Aqui o timer é parado
        }
    }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished])

    return (
        <CountdownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountdownContainer>
    )
}
