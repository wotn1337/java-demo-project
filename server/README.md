# Описание проекта

## Система для управления турнирами.

Разные участники, участники объединяются в команды, команды добавляются к турнирам. У каждого турнира есть турнирная сетка.

## Описание сущностей

1. Участник
   - Имя;
   - Номер.

Участники объединяются в команды.

2. Команда
   - Название;
   - Список участников.

Команды включают в себя участников.

3. Турнир
   - Название;
   - Список команд;
   - Призовой фонд.

Турниры включают в себя список команд. У каждого турнира есть турнирная сетка с распределением команд.
