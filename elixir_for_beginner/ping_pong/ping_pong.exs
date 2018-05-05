defmodule PingPong do
  @max_turns 11

  def ready do
    receive do
      {_sender, _action, @max_turns} ->
        IO.puts "Game Over"
        ready
      {sender, action, turn} ->
        hit_to(sender, switch(action), turn + 1)
        ready
    after
      1000 -> IO.puts "Timing out player #{inspect player_pid}"
    end
  end

  def hit_to(opponent_id, action, turn) do
    IO.puts "#{turn}. hit_to #{inspect opponent_id} #{inspect action}"
    send(opponent_id, {player_pid, action, turn})
  end

  defp player_pid, do: self

  defp switch(action) do
    case action do
      :ping -> :pong
      _ -> :ping
    end
  end
end

player_1 = self
player_2 = PingPong |> Task.start(:ready, []) |> elem(1)

IO.puts "player_1: #{inspect player_1}\nplayer_2: #{inspect player_2}"

PingPong.hit_to(player_2, :ping, 1)
PingPong.ready