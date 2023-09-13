ex1 = """
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
"""

santas_list = File.read!(Path.join([__DIR__, "input.txt"]))

defmodule Day_one do
  def part_one(input), do: make_list(input) |> List.last()

  def part_two(input) do
    make_list(input) |> Enum.take(-3) |> Enum.reduce(0, fn n, acc -> acc + n end)
  end

  defp make_list(input) do
    input
    |> String.trim()
    |> String.split("\n\n")
    |> Enum.map(fn str ->
      str
      |> String.trim()
      |> String.split("\n")
      |> Enum.reduce(0, fn n, acc -> acc + String.to_integer(n) end)
    end)
    |> Enum.sort()
  end
end

case Day_one.part_one(ex1) do
  24000 -> nil
  _ -> IO.inspect("part 1 example incorrect")
end

case Day_one.part_one(santas_list) do
  71780 -> IO.inspect("part 1 complete!")
  _ -> IO.inspect("Part 1 incorrect")
end

case Day_one.part_two(ex1) do
  45000 -> nil
  _ -> IO.inspect("part 2 example incorrect")
end

case Day_one.part_two(santas_list) do
  212_489 -> IO.inspect("part 2 complete!")
  _ -> IO.inspect("Part 2 incorrect")
end
