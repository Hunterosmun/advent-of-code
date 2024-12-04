ex1 = """
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
"""

santas_list = File.read!(Path.join([__DIR__, "input.txt"]))

defmodule Day_one do
  def part_one(input) do
    # check for only 12 red cubes, 13 green cubes, and 14 blue cubes
    input
    |> String.trim()
    |> String.split("\n")
    |> Enum.map(fn part ->
      [game_num, reveals] = String.split(part, ":")
      game_num = String.at(game_num, -1)
      reveals = String.split(reveals, ";")

      {game_num, reveals}
    end)
    |> IO.inspect()
  end

  # def part_two(input) do
  #   input
  #   |> make_list()
  #   |> Enum.map(&convert_letter_nums(&1))
  #   |> Enum.reduce(0, fn item, acc ->
  #     first = item |> get_first()
  #     last = item |> Enum.reverse() |> get_first()
  #     {num, ""} = Integer.parse(first <> last)
  #     acc + num
  #   end)
  # end
end

case Day_one.part_one(ex1) do
  8 -> nil
  resp -> IO.inspect("part 1 example incorrect, got: #{resp}")
end

# case Day_one.part_one(santas_list) do
#   52974 -> IO.inspect("part 1 complete!")
#   resp -> IO.inspect("part 1 incorrect, got: #{resp}")
# end

# case Day_one.part_two(ex2) do
#   281 -> nil
#   resp -> IO.inspect("part 2 example incorrect, got: #{resp}")
# end

# case Day_one.part_two(santas_list) do
#   53340 -> IO.inspect("part 2 complete!")
#   resp -> IO.inspect("part 2 incorrect, got: #{resp}")
# end
