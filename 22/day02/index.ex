ex1 = """
A Y
B X
C Z
"""

santas_list = File.read!(Path.join([__DIR__, "input.txt"]))

opponent = %{A: "rock", B: "paper", C: "scissors"}
me = %{X: "rock", Y: "paper", Z: "scissors"}
condition_needed = %{X: "lose", Y: "draw", Z: "win"}

# lose: 0, draw: 3, win: 6
# rock: 1, paper: 2, scissors: 3

defmodule Day_one do
  def part_one(input) do
    instructions =
      input
      |> String.trim()
      |> String.split("\n")
      |> Enum.map(fn str -> String.split(str, " ") end)
      |> IO.inspect()
  end

  def part_two(input) do
    # Stuff here
  end
end

case Day_one.part_one(ex1) do
  15 -> nil
  _ -> IO.inspect("part 1 example incorrect")
end

case Day_one.part_one(santas_list) do
  11841 -> IO.inspect("part 1 complete!")
  _ -> IO.inspect("Part 1 incorrect")
end

case Day_one.part_two(ex1) do
  12 -> nil
  _ -> IO.inspect("part 2 example incorrect")
end

case Day_one.part_two(santas_list) do
  13022 -> IO.inspect("part 2 complete!")
  _ -> IO.inspect("Part 2 incorrect")
end
