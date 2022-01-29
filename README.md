# rock-paper-scissor-tm

This is a rock paper scissor game but with a twist.
Traditional rock paper scissor goes as follows:
- rock - beats scissor
- scissor - beats paper
- paper - beats rock

This version of the game adds a new move - time-machine.

time machine forces the opponent to verse his previous move
his previous move must not be time machine; it should be the last non time-machine move so that it avoids the infinite loop problem

If two players both get time machine, then both player's previous move will go against each other.