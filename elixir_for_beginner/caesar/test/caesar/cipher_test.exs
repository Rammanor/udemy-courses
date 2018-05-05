defmodule Caesar.CipherTest do
  use ExUnit.Case
  doctest Caesar.Cipher

  import Caesar.Cipher

  test "encrypt shift cipher mapping" do
    assert encrypt("abcd", 1) == "zabc"
  end

  test "encrypt handles capital letters" do
    assert encrypt("abCD", 1) === "zaBC"
  end

  test "encrypt handles spaces" do
    assert encrypt("AB cd", 1) === "ZA bc"
  end

  test "encrypt handles large shift numbers" do
    assert encrypt("abcd", 27) == "zabc"
  end
end
