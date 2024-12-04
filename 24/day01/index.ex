ex1 = """
3   4
4   3
2   5
1   3
3   9
3   3
"""

santas_list = File.read!(Path.join([__DIR__, "input.txt"]))

defmodule Day_one do
  def part_one(input) do
    input |> get_two_lists([]) |> IO.inspect(label: "two lists bro")
    # stuff here
  end

  def part_two(input) do
    # Stuff here
  end

  defp get_two_lists(num1 <> "  " <> num2, list) do
    [list1, list2] = list
    [[String.to_integer(num1) | list1], [String.to_integer(num2) | list2]]
  end
end

case Day_one.part_one(ex1) do
  11 -> nil
  resp -> IO.inspect("part 1 example incorrect, recieved: #{resp}")
end

case Day_one.part_one(santas_list) do
  "answer here" -> IO.inspect("part 1 complete!")
  resp -> IO.inspect("part 1 incorrect, recieved: #{resp}")
end

case Day_one.part_two(ex1) do
  "answer here" -> nil
  resp -> IO.inspect("part 2 example incorrect, recieved: #{resp}")
end

case Day_one.part_two(santas_list) do
  "answer here" -> IO.inspect("part 2 complete!")
  resp -> IO.inspect("part 2 incorrect, recieved: #{resp}")
end
