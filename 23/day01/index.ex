ex1 = """
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
"""

ex2 = """
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
"""

santas_list = File.read!(Path.join([__DIR__, "input.txt"]))

defmodule Day_one do
  def part_one(input) do
    input
    |> make_list()
    |> Enum.reduce(0, fn item, acc ->
      first = item |> String.split("", trim: true) |> get_first()
      last = item |> String.split("", trim: true) |> Enum.reverse() |> get_first()
      {num, ""} = Integer.parse(first <> last)
      acc + num
    end)
  end

  def part_two(input) do
    input
    |> make_list()
    |> Enum.map(&convert_letter_nums(&1))
    |> Enum.reduce(0, fn item, acc ->
      first = item |> get_first()
      last = item |> Enum.reverse() |> get_first()
      {num, ""} = Integer.parse(first <> last)
      acc + num
    end)
  end

  defp make_list(input), do: input |> String.trim() |> String.split("\n")

  defp convert_letter_nums(input), do: convert_letter_nums(input, [])

  defp convert_letter_nums(input, acc) do
    case input do
      "" -> acc
      "one" <> list -> convert_letter_nums("e" <> list, acc ++ ["1"])
      "two" <> list -> convert_letter_nums("o" <> list, acc ++ ["2"])
      "three" <> list -> convert_letter_nums("e" <> list, acc ++ ["3"])
      "four" <> list -> convert_letter_nums(list, acc ++ ["4"])
      "five" <> list -> convert_letter_nums("e" <> list, acc ++ ["5"])
      "six" <> list -> convert_letter_nums(list, acc ++ ["6"])
      "seven" <> list -> convert_letter_nums("n" <> list, acc ++ ["7"])
      "eight" <> list -> convert_letter_nums("t" <> list, acc ++ ["8"])
      "nine" <> list -> convert_letter_nums("e" <> list, acc ++ ["9"])
      <<first::8, rest::binary>> -> convert_letter_nums(rest, acc ++ [<<first::8>>])
    end
  end

  defp get_first([letter | tail]) do
    case Integer.parse(letter) do
      :error -> get_first(tail)
      _ -> letter
    end
  end
end

case Day_one.part_one(ex1) do
  142 -> nil
  resp -> IO.inspect("part 1 example incorrect, got: #{resp}")
end

case Day_one.part_one(santas_list) do
  52974 -> IO.inspect("part 1 complete!")
  resp -> IO.inspect("part 1 example incorrect, got: #{resp}")
end

case Day_one.part_two(ex2) do
  281 -> nil
  resp -> IO.inspect("part 2 example incorrect, got: #{resp}")
end

case Day_one.part_two(santas_list) do
  53340 -> IO.inspect("part 2 complete!")
  resp -> IO.inspect("part 2 example incorrect, got: #{resp}")
end
