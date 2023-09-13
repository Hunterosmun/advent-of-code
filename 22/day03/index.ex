ex1 = """
Stuff
"""

santas_list = File.read!(Path.join([__DIR__, "input.txt"]))

defmodule Day_one do
  def part_one(input) do
    # stuff here
  end

  def part_two(input) do
    # Stuff here
  end
end

case Day_one.part_one(ex1) do
  "answer here" -> nil
  _ -> IO.inspect("part 1 example incorrect")
end

case Day_one.part_one(santas_list) do
  "answer here" -> IO.inspect("part 1 complete!")
  _ -> IO.inspect("Part 1 incorrect")
end

case Day_one.part_two(ex1) do
  "answer here" -> nil
  _ -> IO.inspect("part 2 example incorrect")
end

case Day_one.part_two(santas_list) do
  "answer here" -> IO.inspect("part 2 complete!")
  _ -> IO.inspect("Part 2 incorrect")
end
