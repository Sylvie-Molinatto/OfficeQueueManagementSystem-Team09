# RETROSPECTIVE (Team 09)

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES

### Macro statistics

- Number of stories committed vs. done: **4/3** (One story has been added)
- Total points committed vs. done: **7/10**
- Nr of hours planned vs. spent (as a team): **42h 10m / 55h 35m** = **5d 2h 10m / 6d 7h 35m**

**Remember** a story is done ONLY if it fits the Definition of Done:

- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD if required (you cannot remove items!)

### Detailed statistics

| Story                                  | # Tasks | Points | Hours est.          | Hours actual        |
| -------------------------------------- | ------- | ------ | ------------------- | ------------------- |
| _#0_                                   | 7       | -      | 27h 15m = 3d 3h 15m | 28h 45m = 3d 4h 45m |
| Get ticket                             | 3       | 2      | 6h 55m              | 11h 31m = 1d 3h 31m |
| Next customer                          | 3       | 3      | 6h                  | 10h 49m = 1d 2h 49m |
| Call customer                          | 1       | 2      | 2h                  | 4h 30m              |
| Signal that a customer has been served | -       | 3      | 1h                  | -                   |

_We forgot to track the time spent on the last story because it was implemented at the same time as other tasks_

> place technical tasks corresponding to story `#0` and leave out story points (not applicable in this case)

- Hours per task average:

  - **\~2h 31m (estimated)**

  - **\~3h 35m (actual)**

- Standard deviation:

  - **153 (estimated)**

  - **229 (actual)**

- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent - 1

  1 - 5d 10m / 6d 7h 35m = 1 - 2110 / 3005 = 0.30 = **30%**

## QUALITY MEASURES

- Unit Testing:
  - Total hours estimated
  - Total hours spent: **1h 17m**
  - Nr of automated unit test cases **32**
  - Coverage (if available)
- E2E testing:
  - Total hours estimated
  - Total hours spent **1h 18m**
- Code review:
  - Total hours estimated
  - Total hours spent: **2h 50m**

_We didn't estimate the testing time and the review one because there is not a task solely dedicated to it, it was included in the task estimation_

## ASSESSMENT

- What caused your errors in estimation (if any)?

  - Lack of experience
  - Lack of details and comments on tasks
  - Underestimation of the work effort

- What lessons did you learn (both positive and negative) in this sprint?

  - Sprint planning is very useful and should be done with more attention in order to have tasks with similar efforts, optimal division of work and priority-ordered tasks not to get stuck waiting for another task to be implemented
  - Communication is essential
  - Not everyone has to do the same things, people with different knowledge can do different stuff.

- Which improvement goals set in the previous retrospective were you able to achieve?
  - No previous retrospective has been done
- Which ones you were not able to achieve? Why?

  - No previous retrospective has been done

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

  - **More communication** -> Organize a set of meetings to plan, discuss and communicate about the state of our work and also to make subgroups work together
  - **More accuracy** -> Be more precise when tracking tasks on youtrack
  - **Better work subdivision** -> Divide each story in similar-effort tasks, equal work assignment and priority order.
  - **More detail in tasks** -> Add links (e.g. dependencies) between tasks and more technical information (needs, technical solution that should be implemented, ...)
  - **Work Iteration** -> 1 PR = 1 branch (deleted once PR merged) = 1 task to allow more flexible work and to be sure to have something working all the time

- One thing you are proud of as a Team!!
  - Despite all the problems, we have presented a working project
