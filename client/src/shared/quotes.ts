export const quotes = () => {
  const quotes = [
    "Chúng ta có thể gặp nhiều thất bại nhưng chúng ta không được bị đánh bại – Maya Angelou",
    "Tất cả những sự khó khăn thường là để chuẩn bị cho những người bình thường một số phận phi thường – C.S. Lewis",
    "Nếu bạn muốn trở nên kỳ quặc khác người, hãy tự tin khi làm điều đó (If you’re going to be weird, be confident about it) – Matt Hogan",
    "Bí mật của cuộc sống là ngã bảy lần và đứng dậy tám lần – trích Nhà Giả Kim | Paulo Coelho",
    "Nếu cuộc đời ném vào mặt bạn một quả chanh, hãy vắt nước chanh thay vì chê nó chua quá",
    "Khi bạn không thể tìm thấy ánh nắng mặt trời, hãy là ánh nắng mặt trời.Cách tốt nhất để cổ vũ bản thân là cố gắng cổ vũ người khác – Mark Twain",
    "Hạnh phúc là một sự lựa chọn. Đau khổ cũng là một sự lựa chọn. Hãy lựa chọn khôn ngoan – Roy T. Bennett",
    "Chất lượng hạnh phúc của bạn phụ thuộc vào chất lượng suy nghĩ của bạn – Marcus Aurelius",
    "Hôm nay, tôi chọn là phiên bản tốt nhất của chính mình.Hạnh phúc đạt được khi bạn ngừng chờ đợi điều đó xảy ra và thực hiện các bước để biến nó thành hiện thực.Mọi người sẽ quên những gì bạn nói, quên những gì bạn đã làm, nhưng họ sẽ không bao giờ quên cảm xúc mà bạn mang lại cho họ – Maya Angelou.",
    "Hãy tử tế, vì tất cả những người bạn gặp đều đang chiến đấu một trận chiến khó khăn của họ.Mục đích chính của chúng ta trong cuộc sống này là giúp đỡ người khác. Và nếu bạn không thể giúp họ, ít nhất đừng làm họ bị thương – Đức Đạt Lai Lạt Ma XIV",
    "Hãy là sự thay đổi mà bạn muốn thấy trên thế giới – Mahatma gandhiKhông một hành động tử tế nào, dù nhỏ đến đâu, lại bị lãng phí – Aesop",
    "Trong đời người có ba điều quan trọng: thứ nhất là sống tử tế, thứ hai là tử tế, và thứ ba là phải tử tế – Henry James",
    "Không ai trở nên nghèo khó bằng việc chia sẻ và cho đi – Anne Frank",
    "Hãy sống mỗi ngày như thể đó là ngày cuối cùng của bạn.Một tâm hồn buồn bã cũng có thể gây chết người như một mầm bệnh – John Steinbeck",
    "Hôm nay bạn ngồi dưới bóng mát vì có người trồng cây lâu lắm rồi – Warren Buffett",
    "Một tia nắng duy nhất cũng đủ để xua đuổi nhiều bóng tối – Francis of Assisi",
    "Hãy học cách trân trọng bản thân, có nghĩa là: đấu tranh cho hạnh phúc của bạn – Ayn Rand",
    "Cuộc sống là 10% những gì xảy ra với bạn và 90% là cách bạn phản ứng với nó – Charles R. Swindoll",
    "Nỗi đau bạn cảm thấy hôm nay là sức mạnh bạn sẽ cảm thấy vào ngày mai.Chúng ta có thể phàn nàn vì bụi hồng có gai, hoặc vui mừng vì gai có hoa hồng – Alphonse Karr",
    "Một tấm lòng biết ơn là nền tảng cho mọi đức tính tốt đẹp khác.Bắt đầu mỗi ngày với một suy nghĩ tích cực và một trái tim biết ơn – Roy T. Bennett",
    "Bước đi như thể bạn đang hôn Trái đất bằng đôi chân của mình – Thích Nhất Hạnh",
    "Cuộc đấu tranh kết thúc khi lòng biết ơn bắt đầu – Neale Donald Walsch",
    "Mỗi vị thánh đều có một quá khứ, và mỗi tội nhân đều có một tương lai – Oscar Wilde",
    "Dũng cảm không phải là không sợ hãi: nó là khả năng hành động khi bạn sợ hãi – Bruce Lee",
    "Vết thương là nơi mà ánh sáng sẽ chiếu vào – Rumi",
    "Giông bão làm cho con người mạnh mẽ hơn và không bao giờ tồn tại mãi mãi – Roy T. Bennett",
    "Đừng tự thiêu để giữ ấm cho người khác.Nói chuyện với chính mình như cách bạn nói với người bạn yêu sâu sắc và vô điều kiện.Bạn không thể cứu được người khác, nhưng bạn có thể yêu thương họ.",
  ];

  const randNum = Math.floor(Math.random() * quotes.length);

  return quotes[randNum];
};
