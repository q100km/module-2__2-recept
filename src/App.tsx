import { useState } from 'react'
import styles from './App.module.css'
import data from './data.json'

type dataType = {
  id: string
  title: string
  content: string
}

const App = () => {
  console.log('render')

  const [steps, setSteps] = useState<dataType[]>(data)

  const [activeIndex, setActiveIndex] = useState<number>(0)

  const onStepOne = activeIndex === 0

  const lastStep = data.length - 1

  const handleClick = (targetIndex: number): void => {
    setActiveIndex(targetIndex)
  }

  const nextStep = (): void => {
    setActiveIndex(activeIndex + 1)
    if (activeIndex === lastStep) setActiveIndex(0)
  }

  const backStep = (): void => {
    setActiveIndex(activeIndex - 1)
    if (activeIndex <= 0) setActiveIndex(0)
  }

  console.log(activeIndex)

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Инструкция по готовке пельменей</h1>
        <div className={styles.steps}>
          {steps.map((step, index) => {
            return index === activeIndex ? <span>{step.title}</span> : ''
          })}

          <div className={styles['steps-content']}>
            {steps.map((step, index) => {
              return index === activeIndex ? step.content : ''
            })}
          </div>

          <ul className={styles['steps-list']}>
            {steps.map((_, indx) => {
              return (
                <li
                  key={indx}
                  className={`${styles['steps-item']} ${indx === activeIndex ? styles.active : ''} 
                  ${indx < activeIndex ? styles.done : ''}`}
                >
                  <button onClick={() => handleClick(indx)} className={styles['steps-item-button']}>
                    {indx + 1}
                  </button>
                  Шаг {indx + 1}
                </li>
              )
            })}
          </ul>
          <div className={styles['buttons-container']}>
            <button disabled={onStepOne} onClick={backStep} className={styles.button}>
              Назад
            </button>

            <button onClick={nextStep} className={styles.button}>
              {activeIndex === lastStep ? 'Начать Сначала' : 'Далее'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
